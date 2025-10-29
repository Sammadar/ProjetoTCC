import { NodeService } from '@/pages/service/node.service';
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';


interface Lista {
    field: string;
    header: string;
}

@Component({
  selector: 'app-lista-pacientes',
  imports: [TreeTableModule, ButtonModule],
  templateUrl: './lista-pacientes.html',
  styleUrl: './lista-pacientes.scss'
})
export class ListaPacientes implements OnInit {
    files!: TreeNode[];

    cols!: Lista[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'Nome', header: 'Nome' },
            { field: 'CPF', header: 'CPF' },
            { field: '', header: '' }
        ];
    }
}