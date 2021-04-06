import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private productService:ProductService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })

  }

  add(){
     if (this.productAddForm.valid){
      let productModel= Object.assign({},this.productAddForm.value) 
      this.productService.add(productModel).subscribe(response=>{
        
        this.toastrService.success(response.message,"Başarılı")
      },responseEror=>{
       if(responseEror.error.Errors.lenght>10){
         for (let i = 0; i < responseEror.error.Errors.lenght; i++) {
          this.toastrService.error(responseEror.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
           
         }
       
       }
        
      })
      
     }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
     }
    
     
  }
}
