import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251223_091116 from './20251223_091116';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251223_091116.up,
    down: migration_20251223_091116.down,
    name: '20251223_091116'
  },
];
