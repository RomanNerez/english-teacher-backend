import { APP_ENV } from '@configs/app'

export const isProdEnv = (): boolean => {
    return APP_ENV === 'production';
} 