import { ActionTable, BaseRow } from '../table';

export abstract class BaseTable<RowType extends BaseRow> {
  public handleEvent(row: RowType, action: (row: RowType) => void): void {
    if (action) {
      action(row);
    }
  }

  public showAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.show!(row);
  }

  public disableAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.disabled!(row);
  }
}
