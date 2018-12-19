import { URLSearchParams } from '@angular/http';
export declare class ApiHelpers {
    static interpolate(string: string, params: any, deleteParam?: boolean): string;
    static toSearch(params: any): URLSearchParams;
}
