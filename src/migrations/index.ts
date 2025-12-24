import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251223_091116 from './20251223_091116';
import * as migration_20251223_135614 from './20251223_135614';
import * as migration_20251224_045705 from './20251224_045705';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251223_091116.up,
    down: migration_20251223_091116.down,
    name: '20251223_091116',
  },
  {
    up: migration_20251223_135614.up,
    down: migration_20251223_135614.down,
    name: '20251223_135614',
  },
  {
    up: migration_20251224_045705.up,
    down: migration_20251224_045705.down,
    name: '20251224_045705'
  },
];
