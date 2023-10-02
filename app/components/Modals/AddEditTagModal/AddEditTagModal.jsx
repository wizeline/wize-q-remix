import { useState } from 'react';
import { useFetcher } from '@remix-run/react';
import Button from 'app/components/Atoms/Button';
import PropTypes from 'prop-types';
import ACTIONS from 'app/utils/actions';
import {
  CLOSE_BUTTON,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
} from 'app/utils/constants';
import Input from 'app/components/Atoms/Input';
import * as styled from './AddEditTagModal.styled';

function AddEditTagModal({ onClose }) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(undefined);
  const fetcher = useFetcher();

  const onSubmitTag = () => {
    const data = new FormData();
    if (value == null || value === '') { setError('Value cannot be empty'); return; }
    data.set('action', ACTIONS.CREATE_TAG);
    data.set('tagText', value);
    onClose();
    fetcher.submit(data, { method: 'post', action: '/admin' });
  };

  return (
    <div>
      <styled.Modal>
        <styled.ModalDialog>
          <Button
            category={CLOSE_BUTTON}
            onClick={onClose}
          />
          <styled.ModalHeader>
            <h2>Add new tag</h2>
          </styled.ModalHeader>
          <styled.ModalBody>
            <Input
              type="text"
              value={value}
              onChange={(e) => { setError(undefined); setValue(e.target.value); }}
              placeholder="Add a new tag"
            />
            <div>
              {error && <styled.Error>{error}</styled.Error>}
            </div>
          </styled.ModalBody>
          <styled.ModalFooter>
            <Button category={PRIMARY_BUTTON} onClick={onSubmitTag}>Save</Button>
            <Button category={SECONDARY_BUTTON} onClick={onClose}>Cancel</Button>
          </styled.ModalFooter>
        </styled.ModalDialog>
      </styled.Modal>
    </div>
  );
}

AddEditTagModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddEditTagModal;
