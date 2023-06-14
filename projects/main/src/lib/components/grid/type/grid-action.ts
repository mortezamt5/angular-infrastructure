export class GridAction {
  type?: 'BUTTON' | 'BUTTON_MENU' | 'TOOLBAR';
  text?: string;
  textKey?: string;
  textKeySubSystem?: string;
  matIcon?: string; // material icon
  fontIcon?: string; // font awesome icon
  style?: 'BASIC' | 'RAISED' | 'STROKED' | 'FLAT' | 'ICON' | 'FAB' | 'MINI_FAB';
  color?: ((dataItem: any) => string) | string = () => '';
  actionClick?: Function = () => true;
  disable?: ((dataItem: any) => any) = () => false;
  visible?: ((dataItem: any) => any) = () => true;
}
