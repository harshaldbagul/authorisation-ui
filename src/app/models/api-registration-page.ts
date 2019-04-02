/**
 *
 * Form Post Data for API Page
 * @export
 * @class APIData
 */
export class APIData {
    apiURL: string='';
    appId: string='';
    roles: RolesData[];
}

/**
 * RolesData is form post data for each row added.
 * It is passed as an array[]
 * @export
 * @class RolesData
 */
export class RolesData{
    methodType: string[];
    serverMetadata: string;
    uiMetadata: string;
    role: string;
}

/**
 * Row data for API Table
 * @export
 * @class APITableItem
 */
export class APITableItem{
    apiURL: string;
    appId: string;
    role: string;
    methodId: string;
    serverMetadata: string;
    uiMetadata: string;
}
