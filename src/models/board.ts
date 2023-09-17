import { CellState, Turn } from '@/models/cell-state.ts';
import { ref, Ref } from 'vue';

class BoardCell {
	public readonly state: Ref<CellState> = ref<CellState>(CellState.empty);
	public readonly isDisabled: Ref<boolean> = ref<boolean>(false);

	public makeTurn(newValue: CellState): boolean {
		const isFilled: boolean = this.state.value !== CellState.empty;

		if (!isFilled) {
			this.state.value = newValue;
		}

		return !isFilled;
	}

	public enable(): void {
		this.isDisabled.value = false;
	}

	public disable(): void {
		this.isDisabled.value = true;
	};

	public clear(): void {
		this.state.value = CellState.empty;
	}
}

export class Board {
	public readonly isGameStarted: Ref<boolean> = ref(false);
	public readonly winner: Ref<CellState> = ref(CellState.empty);
	public readonly currentTurn: Ref<Turn> = ref(CellState.cross);
	private readonly cells: BoardCell[] = Array.from({ length: 9 }, () => new BoardCell());

	public readonly rows: BoardCell[][] = [
		this.cells.slice(0, 3),
		this.cells.slice(3, 6),
		this.cells.slice(6, 9)
	];

	public makeTurn(cell: BoardCell): void {
		if (!cell.makeTurn(this.currentTurn.value)) {
			return;
		}

		const winner: CellState = this.checkWin();

		if (winner === CellState.empty) {
			this.delegateTurn();
			return;
		}

		this.winner.value = winner === CellState.circle ? CellState.circle : CellState.cross;
		this.endGame();
	}

	public startGame(): void {
		this.winner.value = CellState.empty;
		this.clearBoard();
		this.enableBoard();
		this.isGameStarted.value = true;
	}

	public endGame(): void {
		this.currentTurn.value = CellState.cross;
		this.disableBoard();
		this.isGameStarted.value = false;
	}

	private enableBoard(): void {
		this.cells.forEach((cell: BoardCell) => cell.enable());
	}

	private disableBoard(): void {
		this.cells.forEach((cell: BoardCell) => cell.disable());
	}

	private clearBoard(): void {
		this.cells.forEach((cell: BoardCell) => cell.clear());
	}

	private delegateTurn(): void {
		this.currentTurn.value = this.currentTurn.value === CellState.cross ? CellState.circle : CellState.cross;
	}

	private readonly winningCombinations: number[][][] = [
		[[0, 0], [0, 1], [0, 2]], // Горизонтальный ряд 1
		[[1, 0], [1, 1], [1, 2]], // Горизонтальный ряд 2
		[[2, 0], [2, 1], [2, 2]], // Горизонтальный ряд 3
		[[0, 0], [1, 0], [2, 0]], // Вертикальный столбец 1
		[[0, 1], [1, 1], [2, 1]], // Вертикальный столбец 2
		[[0, 2], [1, 2], [2, 2]], // Вертикальный столбец 3
		[[0, 0], [1, 1], [2, 2]], // Главная диагональ
		[[0, 2], [1, 1], [2, 0]]  // Побочная диагональ
	];

	private checkWin(): CellState {
		for (const combination of this.winningCombinations) {
			const [row1, col1] = combination[0];
			const [row2, col2] = combination[1];
			const [row3, col3] = combination[2];

			const cell1: BoardCell = this.rows[row1][col1];
			const cell2: BoardCell = this.rows[row2][col2];
			const cell3: BoardCell = this.rows[row3][col3];

			if (cell1.state.value !== CellState.empty && cell1.state.value === cell2.state.value && cell2.state.value === cell3.state.value) {
				return cell1.state.value; // Возвращаем символ победителя (X или O)
			}
		}

		return CellState.empty;
	}
}
