export interface AppConfirmDto {
    title: string;
    message: string;
    buttons: AppConfirmButton[];
    color?: 'info' | 'warning' | 'danger' | 'success';
}

export interface AppConfirmButton {
    title?: string;
    titleKey?: string;
    icon?: string;
    color?: 'info' | 'warning' | 'danger' | 'success';
    action: () => void;
}
