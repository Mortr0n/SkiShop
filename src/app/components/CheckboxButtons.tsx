import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";


interface IProps {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

const CheckboxButtons = (props: IProps) => {
    const { items, checked, onChange } = props;
    const [ checkedItems, setCheckedItems ] = useState(checked || [])

    const handleChecked = (value: string) => {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if(currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return(
        <FormGroup>
            {items.map((item) => (
                <FormControlLabel 
                    control={<Checkbox
                                checked={checkedItems.indexOf(item) !== -1}
                                onClick={() => handleChecked(item)}
                            />} 
                    label={item} 
                    key={item}
                />
            ))}
        </FormGroup>
    )
}
export default CheckboxButtons;