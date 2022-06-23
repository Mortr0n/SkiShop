import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface IProps {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}


const RadioButtonGroup = (props: IProps) => {
    const { options, onChange, selectedValue } = props;

    return(
        <FormControl>
            <RadioGroup
                onChange={onChange}
                value={selectedValue}
            >
                {options.map(({value, label}) => (
                    <FormControlLabel value={value} control={<Radio />} label={label} key={value}/>
                ))}
            </RadioGroup>
        </FormControl>
    )

}

export default RadioButtonGroup;