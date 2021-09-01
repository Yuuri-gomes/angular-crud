import { HeaderService } from './../../../services/header.service';
import { Product } from '../../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, headerService: HeaderService) {
    const id = +this.route.snapshot.paramMap.get('id');
    headerService.headerData = {
      title: 'Exclusão de produto',
      icon: 'delete',
      routeUrl: `/products/delete/${id}`
    }
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if(id != null){ 
      this.productService.readById(id).subscribe(product => {
        this.product = product;
      });
    }
  }

  deleteProduct(): void{
    const id = this.route.snapshot.paramMap.get("id");
    if(id != null){
      this.productService.delete(id).subscribe(() => {
        this.productService.showMessage("Produto excluido com sucesso.");
        this.router.navigate(["/products"]);
      });
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

}
