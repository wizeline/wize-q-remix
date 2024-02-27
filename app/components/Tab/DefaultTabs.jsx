import PropTypes from 'prop-types';
import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

function DefaultTabs({ activeTab, TabsElements, onSelect }) {
  return (
    <Tabs
      style={{ padding: '0px 16px' }}
      defaultActiveKey={activeTab}
      id="uncontrolled"
      onSelect={onSelect}
    >
      {TabsElements.map(({ id, element }) => (
        <Tab
          eventKey={id}
          title={id}
          key={id}
        >
          {' '}
          {element}
          {' '}
        </Tab>
      ))}
    </Tabs>
  );
}

DefaultTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  TabsElements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSelect: PropTypes.func,
};

DefaultTabs.defaultProps = {
  onSelect: () => {},
};

export default DefaultTabs;
