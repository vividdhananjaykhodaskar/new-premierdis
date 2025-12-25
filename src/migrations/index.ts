import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251223_091116 from './20251223_091116';
import * as migration_20251223_135614 from './20251223_135614';
import * as migration_20251224_045705 from './20251224_045705';
import * as migration_20251224_062415 from './20251224_062415';
import * as migration_20251224_064457 from './20251224_064457';
import * as migration_20251224_141750 from './20251224_141750';
import * as migration_20251224_185543 from './20251224_185543';

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
    name: '20251224_045705',
  },
  {
    up: migration_20251224_062415.up,
    down: migration_20251224_062415.down,
    name: '20251224_062415',
  },
  {
    up: migration_20251224_064457.up,
    down: migration_20251224_064457.down,
    name: '20251224_064457',
  },
  {
    up: migration_20251224_141750.up,
    down: migration_20251224_141750.down,
    name: '20251224_141750',
  },
  {
    up: migration_20251224_185543.up,
    down: migration_20251224_185543.down,
    name: '20251224_185543'
  },
];
