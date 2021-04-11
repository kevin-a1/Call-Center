import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTicketsComponent } from './crear-tickets.component';
import { element } from 'protractor';

describe('CrearTicketsComponent', () => {
  let component: CrearTicketsComponent;
  let fixture: ComponentFixture<CrearTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /* $(document).on("change","#add-new-photo", function(){
    console.log(this.files);
    var files = this.files;
    var element;
    var imagensoporte = ["image/jpeg", "image/png", "image/gif"];
    var imagenesnovalidad = false;
   for(var i=0;i<files.length; i++){
     element = files[i];
      for (imagensoporte.indexOf(element.type) != -1){
           createPreview(element);
      }
    }

  });
function createPreview(file){
  var imgCodifies = URL.createObjectURL(file);
  var img = $('div class="col-xl-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container><figure><img src="'+imgCodifies+'"alt="foto usuario><figcaption><i class="icon-cross></i></figcation></figure></div></div>');
  $(img).insertBefore("#add-photo-container");
}
*/
});

