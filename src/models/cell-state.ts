export enum CellState {
	empty,
	cross,
	circle
}

export type Turn = CellState.cross | CellState.circle;
