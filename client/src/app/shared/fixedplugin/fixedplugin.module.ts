import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FixedPluginComponent } from './fixedplugin.component';
import { AccountModule } from './../../pages/account/account.module';

@NgModule({
    imports: [ RouterModule, CommonModule, NgbModule, AccountModule ],
    declarations: [ FixedPluginComponent ],
    exports: [ FixedPluginComponent ]
})

export class FixedPluginModule {}
