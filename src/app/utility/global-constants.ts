import { environment } from './../../environments/environment';

export class GlobalConstants {

    public static BASE_URL : string = environment.BASE_URL; 

    public static HTTP_SUCCESS : string  = "201";

    public static APPS = [
    {
        "app_id": "CPLO Web",
        "app_name":"CPLO Web"
    },
    {
        "app_id": "InSights",
        "app_name":"InSights"
    },
    {
        "app_id": "DLP",
        "app_name":"DLP"
    },
    {
        "app_id": "DP",
        "app_name":"DP"
    },
    {
        "app_id": "IDMS",
        "app_name":"IDMS"
    },
    {
        "app_id": "CPO",
        "app_name":"CPO"
    },
    {
        "app_id": "GMMM",
        "app_name":"GMMM"
    },
    {
        "app_id": "QKPI",
        "app_name":"QKPI"
    }
];
    
}
