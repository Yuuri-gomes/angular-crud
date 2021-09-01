import { HeaderService } from './../../../services/header.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, headerService: HeaderService) {
    const id = +this.route.snapshot.paramMap.get('id');
    headerService.headerData = {
      title: 'Atualização de produto',
      icon: 'edit',
      routeUrl: `/products/update/${id}`
    }
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != null){
      this.productService.readById(id).subscribe( product => {
        this.product = product;
      });
    }
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(["/products"])
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }

}
