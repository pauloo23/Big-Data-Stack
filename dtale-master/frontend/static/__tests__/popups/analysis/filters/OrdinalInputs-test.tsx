import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { ColumnType } from '../../../../dtale/gridUtils';
import { AnalysisType } from '../../../../popups/analysis/ColumnAnalysisState';
import FilterSelect from '../../../../popups/analysis/filters/FilterSelect';
import { default as OrdinalInputs, OrdinalInputsProps } from '../../../../popups/analysis/filters/OrdinalInputs';
import { mockColumnDef } from '../../../mocks/MockColumnDef';

describe('OrdinalInputs tests', () => {
  let result: ShallowWrapper<OrdinalInputsProps>;
  let props: OrdinalInputsProps;

  beforeEach(() => {
    props = {
      selectedCol: 'foo',
      cols: [mockColumnDef({ name: 'foo', dtype: 'str' }), mockColumnDef({ name: 'bar', dtype: 'str' })],
      type: AnalysisType.WORD_VALUE_COUNTS,
      colType: ColumnType.STRING,
      setOrdinalCol: jest.fn(),
      setOrdinalAgg: jest.fn(),
      setCleaners: jest.fn(),
    };
    result = shallow(<OrdinalInputs {...props} />);
  });

  afterEach(jest.resetAllMocks);

  it('calls updateOrdinal', () => {
    result.find(FilterSelect).first().props().onChange({ value: 'bar' });
    result.find(FilterSelect).at(1).props().onChange({ value: 'mean' });
    expect(props.setOrdinalCol).toHaveBeenCalled();
    expect(props.setOrdinalCol).toHaveBeenCalledWith({ value: 'bar' });
    expect(props.setOrdinalAgg).toHaveBeenCalledWith({ value: 'mean' });
    expect(result.find(FilterSelect).first().props().noOptionsText?.()).toBe('No columns found');
  });

  it('renders cleaners on word_value_counts', () => {
    const cleaners = result.find(FilterSelect).last().props().options;
    expect(cleaners).toHaveLength(12);
    expect(cleaners[0].value).toBe('underscore_to_space');
  });

  it('does not render cleaners for int column', () => {
    result.setProps({ colType: ColumnType.INT });
    expect(result.find('div.row')).toHaveLength(1);
  });
});
