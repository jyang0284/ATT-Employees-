import { NgModule } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    
    exports:[
        MatTableModule,
        // MatPaginator,
        // MatSort
    ]
})

export class MaterialModule { }