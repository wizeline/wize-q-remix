import React from 'react';
import PropTypes from 'prop-types';
import * as styled from 'app/components/Atoms/Table/Table.styled';

function Table(props) {
  const { theaders, tdata } = props;

  return (
    <styled.Table>
      <styled.TableHeader>
        <styled.TableRow>
          { theaders.map((header) => (
            <styled.TableCol
              key={header}
              title={header}
            >
              {header}
            </styled.TableCol>
          ))}
        </styled.TableRow>
      </styled.TableHeader>
      <tbody>
        {
            tdata.map((items) => (
              <styled.TableRow>
                {items.data.map((info) => (
                  <styled.TableCol>
                    {' '}
                    {info.item}
                    {' '}
                  </styled.TableCol>
                ))}
              </styled.TableRow>
            ))
        }
      </tbody>
    </styled.Table>
  );
}

Table.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theaders: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  tdata: PropTypes.arrayOf(PropTypes.shape({
    idx: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape()),
  })),
};

export default Table;
