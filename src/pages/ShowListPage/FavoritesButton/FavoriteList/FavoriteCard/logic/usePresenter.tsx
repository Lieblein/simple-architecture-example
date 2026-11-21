import { useState } from 'react';

export default function usePresenter() {
    const [imageError, setImageError] = useState(false);

    const onImageError = () => {
        setImageError(true);
    };

    return {
        imageError,
        onImageError,
    };
}
