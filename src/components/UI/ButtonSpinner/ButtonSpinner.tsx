import {Button} from '@mui/material';
import * as React from 'react';

interface Props {
    text: string;
    icon?: React.ReactNode;
    loading: boolean;
    type: 'button' | 'submit' | 'reset';
}

const ButtonSpinner: React.FC<Props> = ({text, icon, loading, type}) => {
    return (
        <Button
            type={type}
            color="secondary"
            loading={loading}
            variant="outlined"
            loadingPosition="end"
            endIcon={icon}
            disabled={loading}
        >
            {text}
        </Button>
    );
};

export default ButtonSpinner;