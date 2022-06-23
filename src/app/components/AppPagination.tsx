import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";


interface IProps {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

const AppPagination = (props: IProps) => {
    const { metaData, onPageChange } = props;
    const { currentPage, totalCount, totalPages, pageSize } = metaData;

    return(
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage -1) * pageSize + 1} -
                 {(currentPage * pageSize) > totalCount ? 
                    totalCount : 
                    currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination 
                color='secondary'
                size='large'
                count={totalPages}
                page={currentPage}
                onChange={(e, page) =>  onPageChange(page)}
            />
        </Box>
    )
}

export default AppPagination;