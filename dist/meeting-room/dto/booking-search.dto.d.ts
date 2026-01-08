export declare enum FilterOperator {
    EQ = "EQ",
    NE = "NE",
    IN = "IN",
    GTE = ">=",
    LTE = "<=",
    GT = ">",
    LT = "<",
    CONTAINS = "CONTAINS"
}
export declare enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class BookingFilterDto {
    field: string;
    op: FilterOperator;
    value: unknown;
}
export declare class BookingSortDto {
    field: string;
    dir: SortDirection;
}
export declare class BookingSearchCriteriaDto {
    page?: number;
    pageSize?: number;
    filters?: BookingFilterDto[];
    sorts?: BookingSortDto[];
}
