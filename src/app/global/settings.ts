import {Injectable} from '@angular/core';
import {SettingsModel} from '../models/settings-model';

@Injectable()
export class Settings {

  private _companyInfo: SettingsModel;
  private _deliveryType: string[];
  private _bankList: string[];

  constructor() {
    this._companyInfo = new SettingsModel();
  }

  get bankList(): string[] {
    return this._bankList;
  }

  set bankList(value: string[]) {
    this._bankList = value;
  }

  get companyInfo(): SettingsModel {
    return this._companyInfo;
  }

  set companyInfo(value: SettingsModel) {
    this._companyInfo = value;
  }

  get deliveryType(): string[] {
    return this._deliveryType;
  }

  set deliveryType(value: string[]) {
    this._deliveryType = value;
  }
}
