export const BOARD_ROW_COUNT = 6;
export const BOARD_COL_COUNT = 5;
export const enum ROW_STATUS {
  'INVALID' = 'INVALID',
  'CLEAR' = 'CLEAR',
  'NONE' = 'NONE',
}

export const enum TILE_STATUS {
  'CORRECT' = 'CORRECT',
  'PRESENT' = 'PRESENT',
  'ABSENT' = 'ABSENT',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'NONE' = 'NONE',
}

export const enum TILE_ANIMATION_STATUS {
  'FLIP_IN' = 'FLIP_IN',
  'FLIP_OUT' = 'FLIP_OUT',
  'CLEAR' = 'CLEAR',
  'NONE' = 'NONE',
}
