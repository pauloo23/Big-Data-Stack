import * as reduxUtils from '../../dtale/reduxGridUtils';
import { DataViewerUpdateType } from '../../redux/state/AppState';
import { mockColumnDef } from '../mocks/MockColumnDef';

describe('reduxGridUtils', () => {
  const propagateState = jest.fn();

  afterEach(jest.resetAllMocks);

  afterAll(jest.restoreAllMocks);

  it('handles drop-columns', () => {
    const clearDataViewerUpdate = jest.fn();
    const columns = [mockColumnDef({ name: 'foo' }), mockColumnDef({ name: 'bar' })];
    const settings = { allow_cell_edits: true, precision: 2, verticalHeaders: false, predefinedFilters: {} };
    reduxUtils.handleReduxState(
      columns,
      {},
      1,
      { type: DataViewerUpdateType.DROP_COLUMNS, columns: ['foo'] },
      clearDataViewerUpdate,
      propagateState,
      settings,
    );
    expect(propagateState).toHaveBeenCalledWith({ columns: [columns[1]], triggerResize: true }, clearDataViewerUpdate);
  });
});
