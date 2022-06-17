import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";


const ContactPage = () => {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);
    const [ count, setCount ] = useState(1);



    return(
        <>
            <Typography variant='h2'>Contact Page {title} </Typography>
            <Button variant="contained"  onClick={() => dispatch(increment(count))} >Plus {count}</Button>
            <Typography variant="h5">Data is {data}</Typography>
            <Button variant="contained" onClick={() => dispatch(decrement(count))} >Minus {count}</Button>
            <hr></hr>
            <textarea name="count" value={count} onChange={(e) => setCount(Number(e.target.value))} />
            <Typography variant="h4">Change Add and Subtract amount  </Typography>
        </>
        
    )
}

export default ContactPage;