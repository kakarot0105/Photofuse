/**
 * Dedup — Task #7
 * Simple perceptual hash (average hash) utilities for duplicate detection.
 * 
 * Note: Full perceptual hashing requires image processing libraries (sharp, jimp).
 * This module provides the interface and a simple hash comparison utility.
 * In production, you would compute pHash during image sync using a library like 'sharp'.
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
export function isDuplicate(hash1: string, hash2: string, threshold = 5): boolean {
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
      if (isDuplicate(withHash[i].hash, withHash[j].hash)) {
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
 * Simple string hash for filename-based dedup (fallback when no perceptual hash).
 * Uses filename + dimensions to detect exact duplicates across providers.
 */
export function simpleFingerprint(filename: string, width?: number | null, height?: number | null): string {
  const name = filename.toLowerCase().replace(/\.[^.]+$/, ""); // Remove extension
  return `${name}_${width || 0}x${height || 0}`;
}
