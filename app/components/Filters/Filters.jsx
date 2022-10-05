import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import filterIcon from '~/images/ic_filter.svg';
import * as Styled from './Filters.Styled';

import {
  SORTING_OPTIONS,
  DEFAULT_SORTING_OPT,
  SORTING_ACCESS_VALUE,
  DATE_RANGE_OPTIONS,
  DEFAULT_DATE_RANGE_OPT,
  DATE_RANGE_LABEL,
  DATE_RANGE_ACCESS_VALUE,
  STATUS_OPTIONS,
  DEFAULT_STATUS_OPT,
  STATUS_LABEL,
  STATUS_ACCESS_VALUE,
  DEPARTMENT_OPTIONS,
  DEFAULT_DEPARTMENT_OPT,
  DEPARTMENT_LABEL,
  DEPARTMENT_ACCESS_VALUE,
  DEFAULT_LOCATION,
  LOCATION_LABEL,
  LOCATION_ACCESS_VALUE,
  TEXT_BUTTON,
} from '~/utils/constants';
import Button from '~/components/Atoms/Button';
import CustomDropdown from '~/components/CustomDropdown';


function Filters(props) {
  const { callFetchQuestions, modifyQuery, departments, locations } = props;

  const findDefaultLocation = arrayLocations =>
  arrayLocations.find(location => location.code === DEFAULT_LOCATION);

  const [selectedOrderBy, setSelectedOrderBy] = useState(DEFAULT_SORTING_OPT);
  const [selectedDateRange, setSelectedDateRange] = useState(DEFAULT_DATE_RANGE_OPT);
  const [selectedStatus, setSelectedStatus] = useState(DEFAULT_STATUS_OPT);
  const [selectedDepartment, setSelectedDepartment] = useState(DEFAULT_DEPARTMENT_OPT);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersButtonName, setFiltersButtonName] = useState('Show filters');

  useEffect(() => {
    setSelectedLocation(findDefaultLocation(locations));
  }, [locations]);

  useEffect(() => {
    if (selectedLocation !== null && selectedLocation !== undefined) {
      if (
        selectedDateRange.name === DEFAULT_DATE_RANGE_OPT.name &&
        selectedDepartment.name === DEFAULT_DEPARTMENT_OPT.name &&
        selectedStatus.name === DEFAULT_STATUS_OPT.name &&
        selectedLocation.code === DEFAULT_LOCATION
        ) {
        setShowClearButton(false);
      } else {
        setShowClearButton(true);
      }
    }
  }, [selectedDateRange, selectedStatus, selectedDepartment, selectedLocation]);

  const applyFilters = async () => {
    await callFetchQuestions();
  };

  const selectOrderByFilter = (selectOrderBy) => {
    setSelectedOrderBy(selectOrderBy);
    modifyQuery('order', selectOrderBy.value);
    applyFilters();
  };

  const selectDateRangeFilter = (selectDateRange, apply = true) => {
    setSelectedDateRange(selectDateRange);
    modifyQuery('dateRange', selectDateRange.value);
    if (apply) applyFilters();
  };

  const selectStatusFilter = (selectStatus, apply = true) => {
    setSelectedStatus(selectStatus);
    modifyQuery('status', selectStatus.value);
    if (apply) applyFilters();
  };

  const selectDepartmentFilter = (selectDepartment, apply = true) => {
    setSelectedDepartment(selectDepartment);
    modifyQuery('departmentId', selectDepartment.department_id);
    if (apply) applyFilters();
  };

  const selectLocationFilter = (selectLocation, apply = true) => {
    setSelectedLocation(selectLocation);
    modifyQuery('location', selectLocation.code);
    if (apply) applyFilters();
  };

  const clearAllFilters = () => {
    selectDateRangeFilter(DEFAULT_DATE_RANGE_OPT, false);
    selectStatusFilter(DEFAULT_STATUS_OPT, false);
    selectDepartmentFilter(DEFAULT_DEPARTMENT_OPT, false);
    selectLocationFilter(findDefaultLocation(locations), false);
    applyFilters();
  };

  const selectFilters = () => {
    if (!showFilters) {
      setFiltersButtonName('Hide filters');
      setShowFilters(true);
    } else {
      setFiltersButtonName('Show filters');
      setShowFilters(false);
    }
  };

  const getLocationFilterConfig = () => {
    let selectedLocationsProps = {};
    if (selectedLocation) {
      selectedLocationsProps = {
        text: selectedLocation.name,
        selectedValue: selectedLocation.code,
        isHihlighted: selectedLocation.code !== DEFAULT_LOCATION,
      };
    }
    return {
      ...selectedLocationsProps,
      elements: locations,
      label: LOCATION_LABEL,
      onSelectFunc: selectLocationFilter,
      accessValueName: LOCATION_ACCESS_VALUE,
      disabled: selectedLocation === undefined,
    };
  };

  const orderByDropdownConfig = {
    elements: SORTING_OPTIONS,
    label: selectedOrderBy.name,
    onSelectFunc: selectOrderByFilter,
    selectedValue: selectedOrderBy.value,
    showSelected: false,
    accessValueName: SORTING_ACCESS_VALUE,
  };

  const dateRangeFilterConfig = {
    elements: DATE_RANGE_OPTIONS,
    text: selectedDateRange.name,
    label: DATE_RANGE_LABEL,
    onSelectFunc: selectDateRangeFilter,
    selectedValue: selectedDateRange.value,
    isHihlighted: selectedDateRange !== DEFAULT_DATE_RANGE_OPT,
    accessValueName: DATE_RANGE_ACCESS_VALUE,
  };

  const departmentFilterConfig = {
    elements: [...DEPARTMENT_OPTIONS, ...departments],
    text: selectedDepartment.name,
    label: DEPARTMENT_LABEL,
    onSelectFunc: selectDepartmentFilter,
    selectedValue: selectedDepartment.department_id,
    isHihlighted: selectedDepartment !== DEFAULT_DEPARTMENT_OPT,
    accessValueName: DEPARTMENT_ACCESS_VALUE,
  };

  const statusFilterConfig = {
    elements: STATUS_OPTIONS,
    text: selectedStatus.name,
    label: STATUS_LABEL,
    onSelectFunc: selectStatusFilter,
    selectedValue: selectedStatus.value,
    isHihlighted: selectedStatus !== DEFAULT_STATUS_OPT,
    accessValueName: STATUS_ACCESS_VALUE,
  };

  return (
    <Styled.Filters>
      <Button
        type="button"
        category={TEXT_BUTTON}
        className="show-filters-button"
        onClick={selectFilters}
      >
        <Styled.Icon src={filterIcon} alt="Icon" />
        <span>{filtersButtonName}</span>
      </Button>
      <Styled.FiltersLine secondary visibility="none" />
      <Styled.FiltersWrapper
        hideComponent={!showFilters ? 'none' : 'block'}
      >
        <Styled.FiltersContainer>
          <Styled.FiltersBlock>
            <Styled.FiltersLabel>Order by:</Styled.FiltersLabel>
            <Styled.FiltersField>
              <CustomDropdown {...orderByDropdownConfig} />
            </Styled.FiltersField>
          </Styled.FiltersBlock>
          <Styled.FiltersLine visibility="block" />
          <Styled.FiltersBlock>
            <Styled.FiltersLabel>
                Filter by:{' '}
              {showClearButton && (
              <a onClick={clearAllFilters}>Clear All Filters</a>
                )}
            </Styled.FiltersLabel>
            <Styled.FiltersField>
              <CustomDropdown {...dateRangeFilterConfig} />
            </Styled.FiltersField>
            <Styled.FiltersField>
              <CustomDropdown {...statusFilterConfig} />
            </Styled.FiltersField>
            <Styled.FiltersField departments>
              <CustomDropdown {...departmentFilterConfig} />
            </Styled.FiltersField>
            <Styled.FiltersField>
              <CustomDropdown {...getLocationFilterConfig()} />
            </Styled.FiltersField>
          </Styled.FiltersBlock>
        </Styled.FiltersContainer>
      </Styled.FiltersWrapper>
    </Styled.Filters>
  );
}

Filters.propTypes = {
  callFetchQuestions: PropTypes.func.isRequired,
  modifyQuery: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      department_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,

  locations: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Filters;
