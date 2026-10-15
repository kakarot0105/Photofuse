/**
 * Dedup — Task #7
 * Fingerprint + hash helpers for duplicate detection across providers.
 */

/**
 * Compare two perceptual hashes and return the Hamming distance.
 * Lower distance = more similar. Distance 0 = identical.
 */
export function hammingDistance(hash1: string, hash2: string): number {
  if (hash1.length !== hash2.length) return Infinity;
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) distance++;
  }
  return distance;
}

/**
 * Check if two hashes are duplicates within a given threshold.
 * Default threshold of 5 works well for 64-bit perceptual hashes.
 */
export function isDuplicateHash(hash1: string, hash2: string, threshold = 5): boolean {
  return hammingDistance(hash1, hash2) <= threshold;
}

/**
 * Find duplicate groups in a list of photos.
 * Returns arrays of photo IDs that are duplicates of each other.
 */
export function findDuplicateGroups(
  photos: Array<{ id: string; hash: string | null }>
): string[][] {
  const withHash = photos.filter((p): p is { id: string; hash: string } => p.hash !== null);
  const groups: string[][] = [];
  const visited = new Set<string>();

  for (let i = 0; i < withHash.length; i++) {
    if (visited.has(withHash[i].id)) continue;

    const group: string[] = [withHash[i].id];
    for (let j = i + 1; j < withHash.length; j++) {
      if (visited.has(withHash[j].id)) continue;
      if (isDuplicateHash(withHash[i].hash, withHash[j].hash)) {
        group.push(withHash[j].id);
        visited.add(withHash[j].id);
      }
    }

    if (group.length > 1) {
      groups.push(group);
      group.forEach((id) => visited.add(id));
    }
  }

  return groups;
}

/**
 * Simple fingerprint for filename + dimensions (fallback when no perceptual hash).
 * Detects exact duplicates across providers when the same export is uploaded twice.
 */
export function simpleFingerprint(
  filename: string,
  width?: number | null,
  height?: number | null
): string {
  const name = filename.toLowerCase().replace(/\.[^.]+$/, "");
  return `${name}_${width || 0}x${height || 0}`;
}

/**
 * Mark photos that share a hash as duplicates for a given user.
 * Keeps the oldest photo's isDuplicate=false; marks later matches true.
 */
export async function markDuplicatesForUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any,
  userId: string,
  hashes: string[]
): Promise<void> {
  const uniqueHashes = Array.from(new Set(hashes.filter(Boolean)));
  if (uniqueHashes.length === 0) return;

  for (const hash of uniqueHashes) {
    const matches = await prisma.photo.findMany({
      where: { userId, hash },
      orderBy: { createdAt: "asc" },
      select: { id: true },
    });

    if (matches.length < 2) {
      if (matches.length === 1) {
        await prisma.photo.update({
          where: { id: matches[0].id },
          data: { isDuplicate: false },
        });
      }
      continue;
    }

    // First (oldest) is the original; rest are duplicates
    await prisma.photo.update({
      where: { id: matches[0].id },
      data: { isDuplicate: false },
    });
    await prisma.photo.updateMany({
      where: { id: { in: matches.slice(1).map((m: { id: string }) => m.id) } },
      data: { isDuplicate: true },
    });
  }
}
