import {Button} from '@mui/material';
import * as React from 'react';

interface Props {
    text: string;
    icon?: React.ReactNode
    loading: boolean;
}

const ButtonSpinner: React.FC<Props> = ({text, icon, loading}) => {
    return (
        <Button
            color="secondary"
            loading={loading}
            variant="outlined"
            loadingPosition="end"
            startIcon={icon}
            disabled={loading}
        >
            {text}
        </Button>
    );
};

export default ButtonSpinner;