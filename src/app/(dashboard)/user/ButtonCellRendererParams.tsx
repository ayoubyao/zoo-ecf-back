import { CustomCellRendererProps } from '@ag-grid-community/react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";

interface CustomButtonParams extends CustomCellRendererProps {
    onClick: () => void;
}

const ButtonCellRendererParams = (params: CustomButtonParams) => {
    const router = useRouter()
    return <Button onClick={() => {router.push("/user/edit")}}>edit</Button>;
};

export default ButtonCellRendererParams;