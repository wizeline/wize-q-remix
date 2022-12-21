import { useEffect, useState } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import DropdownTitle from 'app/components/DropdownTitle';
import { FaBuilding, FaUser } from 'react-icons/fa';
import { StyledMenu } from './DropdownMenu.Styled';
import { ImLocation } from 'react-icons/im';



const DropdownMenu = ({ name, handler, type, selectedOption, options }) => {

    const [option, setSelectedOption] = useState(selectedOption)

    useEffect(() => {
        setSelectedOption(selectedOption);
    }, [options])

    const handleSelect = (option) => {
        setSelectedOption(option)
        handler(option)

    }

    const renderOptions = () => {
        let values = [];


        switch (type) {
            case 'Build': values = options.map((dep) => (
                <MenuItem eventKey={dep} key={dep.department_id} onClick={() => handleSelect(dep)}>
                    {dep.name}
                </MenuItem>)); break
            case 'People': values = options.map((item) => (
                <MenuItem eventKey={item} key={item.id} onClick={() => handleSelect(item)}>
                    {item.name}
                </MenuItem>
            )); break;
            case 'Location': values = options.map((loc) => (
                <MenuItem eventKey={loc.code} key={loc.code} onClick={() => handleSelect(loc)}>{loc.name}</MenuItem>
            ));
        }

        return values;
    }


    const getIcon = () => {
        switch (type) {
            case 'Build': return <FaBuilding color={option ? 'white' : 'black'} />
            case 'People': return <FaUser color={option ? 'white' : 'black'} />
            case 'Location': return <ImLocation color={option ? 'white' : 'black'} />
        }
    }

    return (
        <StyledMenu item={option}>
            <DropdownButton
                bsStyle="default"
                title={(
                    <DropdownTitle title={option ? option.name : name}>
                        {getIcon()}
                    </DropdownTitle>
                )}
                noCaret
            >
                {options.length === 0 ? <MenuItem >
                    Not options avaiable
                </MenuItem> : renderOptions()}
            </DropdownButton>
        </StyledMenu>);
}

export default DropdownMenu;