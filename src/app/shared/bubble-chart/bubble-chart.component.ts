import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { KpiApiService } from '../api.service';
import * as _ from 'lodash'; 

interface BubbleChartConfig {
    argumentKey: string;
    valueKey: string;
    sizeKey: string;
    colorKey?: string;
    gap?:string;
    minimumBubbleSize?:string;
    maximumBubbleSize?:string;
}

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.scss'],
})
export class BubbleChartComponent implements OnInit {
    chrtWidth ;
    chrtHeight ;
    config: BubbleChartConfig;
    @ViewChild('canvas', { static: true })
    canvas!: ElementRef<HTMLCanvasElement>;
    data: { x: number; y: number; radius: number; color: string,data: any }[] = [];
    ctx!: CanvasRenderingContext2D;

     uniqueDates: string[] = [];
     uniqueTablename: string[] = [];
     filteredData;
 
     sourceData: any;
     isDataValid: boolean = false;
     tooltip: { display: boolean, x: number, y: number, text: string } = { display: false, x: 0, y: 0, text: '' };
     keyValuePair: { name: string; value: any }[] = [];
    valuKeyWidth: number;

    roated:boolean = true;
    argumentKeyWidth: number;
    localData: any;
    bubbleGap:any = 50;
    bubbleColor:any = 'yellow';
    bubbleMinimumSize:any = 12;
    bubbleMaximumSize:any = 20;


    @Input('dataSource')
    set dataSource(value) {
        this.localData = _.cloneDeep(value.datasource);  
       if (!value.chartConfig) return;
        this.config = value.chartConfig;
        this.uniqueDates = this.getUniqueData(
            this.localData,
            this.config.argumentKey
        );
        this.uniqueTablename = this.getUniqueData(
            this.localData,
            this.config.valueKey
        );
        
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.measereValueFieldWidth();
        this.measereArgumentFieldWidth();
        this.chrtHeight = this.uniqueTablename.length * this.bubbleGap + 100 + this.argumentKeyWidth;
        this.chrtWidth = this.valuKeyWidth + 100 + this.uniqueDates.length * this.bubbleGap + 50;
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
            canvas.width = this.chrtWidth;
            canvas.height = this.chrtHeight;
        
        this.getData( this.localData);
        this.drawChart();
        
    }

   

    constructor(private apiService: KpiApiService,private elementRef: ElementRef) {
       
    }

    ngOnInit(): void {
        // this.uniqueDates = this.getUniqueDates(this.sourceData);
        // console.log(this.uniqueDates);
        // this.uniqueDates.forEach(element => {
        //   this.filterByDateData(element)
        // });
        // this.ctx = this.canvas.nativeElement.getContext('2d')!;
        // this.drawChart();
    }

    drawChart() {
        // debugger
        if (!this.ctx) return;

        // Clear the canvas
        this.ctx.clearRect(
            0,
            0,
            this.canvas.nativeElement.width,
            this.canvas.nativeElement.height
        );

        // Draw each bubble
        this.data.forEach((bubble) => {
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = bubble.color;
            this.ctx.fill();
            this.ctx.closePath();
        });
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';

        

        this.uniqueTablename.forEach((element, i) => {
            this.ctx.fillText(element, this.valuKeyWidth + 100, (i + 1) * this.bubbleGap);
        });

        if (this.roated) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.textAlign = 'left';
            this.uniqueDates.forEach((element, i) => {
                this.ctx.fillText(
                    element,
                    this.uniqueTablename.length * this.bubbleGap + 50 ,
                   - ((i + 1) * this.bubbleGap + this.valuKeyWidth +100)
                );
            }); 
        }else {

             
             this.ctx.textAlign = 'center';
            this.uniqueDates.forEach((element, i) => {
            this.ctx.fillText(
                element,
                this.valuKeyWidth +100 + (i + 1) * 60,
                this.uniqueTablename.length * 60 + 50,
              
            );
        });

        }
        
        
        
     

        // this.ctx.fillText('Hello', 50, 100);
        // this.ctx.fillText('Hello', 50, 200);
        // this.ctx.fillText('Hello', 50, 300);
        // // this.ctx.fillText('Hello', 50, 400);
        // this.ctx.fillText('Hello', 100, 450);
        // this.ctx.fillText('Hello', 200, 450);
        // this.ctx.fillText('Hello', 300, 450);
        // this.ctx.fillText('Hello', 400, 450);
    }

    getData(data) {
       
        if (data && data.length > 0) {
            this.filteredData = [];
            this.uniqueDates.forEach((element) => {
                this.filteredData.push(this.filterByDateData(element, data));
            });

            console.log(this.filteredData);
            this.prepereFinalDataset();
        } else {
            console.error('Data is not properly initialized or is empty.');
        }
        // console.log(data ,'source data');
    }

    getUniqueData(data, keyName): string[] {
        const dates = data.map((item) => item[keyName]);
        return Array.from(new Set(dates));
    }

    filterByDateData(date: string, sourceData: any): void {
        let data;
        return (data = this.filterByDate(sourceData, date));
        // this.filteredData = this.filterByDate(this.sourceData, date);
    }

    filterByDate(data, date: string) {
        return data.filter((item) => item[this.config.argumentKey] === date);
    }

    prepereFinalDataset() {
        // let data = [];
        this.data = [];
        this.filteredData.forEach((element, i) => {
            let normalizedTableNames = this.normalizedTableNames(element);

            normalizedTableNames.forEach((element, j) => {
                let obj = {
                    x: this.valuKeyWidth + 100  + (i + 1) * this.bubbleGap,
                    y: (j + 1) * this.bubbleGap,
                    radius: element[this.config.sizeKey],
                    color: this.bubbleColor,
                    data:element
                };
                // data.push(obj);
                this.data.push(obj);
            });
        });

        console.log(this.data);
    }

    normalizedTableNames(data) {
        // Reduce the filtered data to get unique tableNames with their fileCount values
        const uniqueTableNames = data.reduce((acc, current) => {
            if (
                !acc.some(
                    (item) =>
                        item[this.config.valueKey] ===
                        current[this.config.valueKey]
                )
            ) {
                // acc.push({
                //     tableName: current[this.config.valueKey],
                //     fileCount: current[this.config.sizeKey],
                // });
                acc.push(current);
            }
            return acc;
        }, []);

        // Find the maximum fileCount value
        const maxFileCount = Math.max(
            ...uniqueTableNames.map((item) => item[this.config.sizeKey])
        );

        // Define normalization parameters
        const maxScaled = this.bubbleMaximumSize;
        const minScaled = this.bubbleMinimumSize;

        // Normalize the fileCount values so that the highest value is 20 and others are proportional
        // const normalizedTableNames = uniqueTableNames.map((item) => {
        //     return {
        //         tableName: item.tableName,
        //         normalizedFileCount: Math.max(
        //             minScaled,
        //             Math.round((item.fileCount / maxFileCount) * maxScaled)
        //         ),
        //     };
        // });

        uniqueTableNames.forEach(element => {
            element[this.config.sizeKey] = Math.max(
                             minScaled,
                            Math.round((element[this.config.sizeKey] / maxFileCount) * maxScaled)
                        )
            
        });

        return uniqueTableNames;

        // return normalizedTableNames;

        // console.log(normalizedTableNames);
    }




    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
  
      let foundBubble = null;
  
      for (let bubble of this.data) {
        const dist = Math.sqrt((mouseX - bubble.x) ** 2 + (mouseY - bubble.y) ** 2);
        if (dist < bubble.radius) {
          foundBubble = bubble;
          break;
        }
      }
  
      if (foundBubble) {
        this.tooltip.display = true;
        this.tooltip.x = mouseX;
        this.tooltip.y = mouseY;
        this.tooltip.text = `Table: ${foundBubble.data.tableName}\nFile Size: ${foundBubble.data.fileSize}\nDate: ${foundBubble.data.recordDate}`;
        this.keyValuePair = Object.keys(foundBubble.data).map(key => ({
            name: key,
            value: foundBubble.data[key]
          }));
        // console.log(foundBubble);
      } else {
        this.tooltip.display = false;
      }
    }

    measereValueFieldWidth(){

       
        const roundedNumbers = [];
        
        this.uniqueTablename.forEach(number => {
          roundedNumbers.push(Math.round(this.ctx.measureText(number).width));
        });
        
        console.log(roundedNumbers); 
        const highestValue = Math.max(...roundedNumbers);
        this.valuKeyWidth = highestValue;
        console.log(this.valuKeyWidth);

       
    }

    measereArgumentFieldWidth(){

       
        const roundedNumbers = [];
        
        this.uniqueDates.forEach(number => {
          roundedNumbers.push(Math.round(this.ctx.measureText(number).width));
        });
        
        console.log(roundedNumbers); 
        const highestValue = Math.max(...roundedNumbers);
        this.argumentKeyWidth = highestValue;
        console.log(this.valuKeyWidth);

       
    }
}
