export interface WebhookModel {
    Event: {
        EventHeader: {
            ID: string;
            Timestamp: string; // ISO string
            Type: string;
            Version: string;
            Priority: number;
            PriorityName: string;
            Name: string;
            Message: string;
            Source: {
                Name: string;
                FQID: {
                    ServerId: {
                        Type: string;
                        Hostname: string;
                        Port: number;
                        Id: string;
                        Scheme: string;
                    };
                    ParentId: string;
                    ObjectId: string;
                    FolderType: number;
                    Kind: string;
                };
            };
            MessageId: string;
        };
    };
    Site: {
        ServerHostname: string;
        AbsoluteUri: string;
        ServerType: string;
    };
}  