import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import filterIcon from "app/images/ic_filter.svg";
import * as Styled from "app/components/Filters/Filters.Styled";

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
  ENABLED_OPTIONS,
  ENABLED_LABEL,
  ENABLED_ACCESS_VALUE,
  DEFAULT_ENABLED_OPT,
  DEFAULT_ENABLED,
  DEFAULT_DEPARTMENT_OPT,
  DEPARTMENT_LABEL,
  DEPARTMENT_ACCESS_VALUE,
  DEFAULT_LOCATION,
  LOCATION_LABEL,
  LOCATION_ACCESS_VALUE,
  TEXT_BUTTON,
  DEFAULT_LOCATION_OPT,
} from "app/utils/constants";
import Button from "app/components/Atoms/Button";
import CustomDropdown from "app/components/CustomDropdown";
import useUser from 'app/utils/hooks/useUser';

function Filters(props) {
  const { is_admin: isAdmin } = useUser();
  
  const { modifyQuery, clearFilters } = props;

  const { departments, locations } = useLoaderData();

  const [searchParams] = useSearchParams();

  const getDefaultStatus = () => {
    const searchParam = searchParams.get("status");
    if (searchParam) {
      const found = STATUS_OPTIONS.find(
        (status) => status.value === searchParam
      );
      if (found) return found;
    }

    return DEFAULT_STATUS_OPT;
  };

  const getDefaultSortOption = () => {
    const searchParam = searchParams.get("order");
    if (searchParam) {
      const found = SORTING_OPTIONS.find(
        (order) => order.value === searchParam
      );
      if (found) return found;
    }

    return DEFAULT_SORTING_OPT;
  };

  const getDefaultDateRangeOption = () => {
    const searchParam = searchParams.get("dateRange");
    if (searchParam) {
      const found = DATE_RANGE_OPTIONS.find(
        (date) => date.value === searchParam
      );
      if (found) return found;
    }

    return DEFAULT_DATE_RANGE_OPT;
  };

  const getDefaultDepartmentOption = () => {
    const searchParam = parseInt(searchParams.get("department"), 10);
    if (searchParam !== undefined) {
      const found = DEPARTMENT_OPTIONS.find(
        (option) => option.department_id === searchParam
      );
      if (found) return found;
      const foundInData = departments.find(
        (department) => department.department_id === searchParam
      );

      if (foundInData) return foundInData;
    }

    return DEFAULT_DEPARTMENT_OPT;
  };

  const getDefaultLocationOption = () => {
    const searchParam = searchParams.get("location");
    if (searchParam) {
      const foundInData = locations.find(
        (location) => location.code === searchParam
      );
      if (foundInData) return foundInData;
    }

    return DEFAULT_LOCATION_OPT;
  };

  const getDefaultEnabledOption = () => {
    const searchParam = searchParams.get("is_enabled");
    if (searchParam) {
      const found = ENABLED_OPTIONS.find(
        (enabled) => enabled.is_enabled === +searchParam
      );
      if (found) return found;
    }

    return DEFAULT_ENABLED_OPT;
  };

  const [selectedOrderBy, setSelectedOrderBy] = useState(
    getDefaultSortOption()
  );
  const [selectedDateRange, setSelectedDateRange] = useState(
    getDefaultDateRangeOption()
  );
  const [selectedStatus, setSelectedStatus] = useState(getDefaultStatus());
  const [selectedDepartment, setSelectedDepartment] = useState(
    getDefaultDepartmentOption()
  );
  const [selectedLocation, setSelectedLocation] = useState(
    getDefaultLocationOption()
  );
  const [selectedEnabled, setSelectedEnabled] = useState(
    getDefaultEnabledOption()
  );
  const [showClearButton, setShowClearButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtersButtonName, setFiltersButtonName] = useState("Show filters");

  useEffect(() => {
    if (selectedLocation !== null && selectedLocation !== undefined) {
      if (
        selectedDateRange.name === DEFAULT_DATE_RANGE_OPT.name &&
        selectedDepartment.name === DEFAULT_DEPARTMENT_OPT.name &&
        selectedStatus.name === DEFAULT_STATUS_OPT.name &&
        selectedLocation.code === DEFAULT_LOCATION &&
        selectedEnabled.is_enabled === DEFAULT_ENABLED
      ) {
        setShowClearButton(false);
      } else {
        setShowClearButton(true);
      }
    }
  }, [
    selectedDateRange,
    selectedStatus,
    selectedDepartment,
    selectedLocation,
    selectedEnabled,
  ]);

  const selectOrderByFilter = (selectOrderBy) => {
    setSelectedOrderBy(selectOrderBy);
    modifyQuery("order", selectOrderBy.value);
  };

  const selectDateRangeFilter = (selectDateRange) => {
    setSelectedDateRange(selectDateRange);
    if (selectDateRange.value === "all") {
      modifyQuery("dateRange", undefined);
    } else {
      modifyQuery("dateRange", selectDateRange.value);
    }
  };

  const selectStatusFilter = (selectStatus) => {
    setSelectedStatus(selectStatus);
    if (selectStatus.value === "all") {
      modifyQuery("status", undefined);
    } else {
      modifyQuery("status", selectStatus.value);
    }
  };

  const selectDepartmentFilter = (selectDepartment) => {
    setSelectedDepartment(selectDepartment);
    if (selectDepartment.department_id === -1) {
      modifyQuery("department", undefined);
    } else {
      modifyQuery("department", selectDepartment.department_id);
    }
  };

  const selectEnabledFilter = (selectEnabled) => {
    setSelectedEnabled(selectEnabled);
    if (selectEnabled.is_enabled === -1) {
      modifyQuery("is_enabled", undefined);
    } else {
      modifyQuery("is_enabled", selectEnabled.is_enabled);
    }
  };

  const selectLocationFilter = (selectLocation) => {
    setSelectedLocation(selectLocation);
    modifyQuery("location", selectLocation.code);
  };

  const clearAllFilters = () => {
    selectDateRangeFilter(DEFAULT_DATE_RANGE_OPT, false);
    selectStatusFilter(DEFAULT_STATUS_OPT, false);
    selectDepartmentFilter(DEFAULT_DEPARTMENT_OPT, false);
    selectLocationFilter(DEFAULT_LOCATION_OPT, false);
    selectEnabledFilter(DEFAULT_ENABLED_OPT, false);

    clearFilters(["location", "department", "status", "dateRange", "enabled"]);
  };

  const selectFilters = () => {
    if (!showFilters) {
      setFiltersButtonName("Hide filters");
      setShowFilters(true);
    } else {
      setFiltersButtonName("Show filters");
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

  const enabledFilterConfig = {
    elements: [...ENABLED_OPTIONS],
    text: selectedEnabled.name,
    label: ENABLED_LABEL,
    onSelectFunc: selectEnabledFilter,
    selectedValue: selectedEnabled.is_enabled,
    isHihlighted: selectedEnabled !== DEFAULT_ENABLED_OPT,
    accessValueName: ENABLED_ACCESS_VALUE,
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
      <Styled.FiltersWrapper hideComponent={!showFilters ? "none" : "block"}>
        <Styled.FiltersContainer>
          <Styled.FiltersBlock>
            <Styled.FiltersLabel>Order by:</Styled.FiltersLabel>
            <Styled.FiltersField>
              <CustomDropdown {...orderByDropdownConfig} />
            </Styled.FiltersField>
          </Styled.FiltersBlock>
          <Styled.FiltersBlock>
            <Styled.FiltersLabel>
              Filter by:{" "}
              {showClearButton && (
                <button type="button" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
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
            {isAdmin && (
              <Styled.FiltersField>
                <CustomDropdown {...enabledFilterConfig} />
              </Styled.FiltersField>
            )}
          </Styled.FiltersBlock>
        </Styled.FiltersContainer>
      </Styled.FiltersWrapper>
    </Styled.Filters>
  );
}

Filters.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  modifyQuery: PropTypes.func.isRequired,
};

export default Filters;
