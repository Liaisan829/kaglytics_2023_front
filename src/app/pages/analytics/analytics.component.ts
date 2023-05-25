import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { AnalyticsService } from "@services/analytics.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";

@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit {
	categories = {};
	organizations = {};
	rewardTypes = {};
	tags = {};

	categoriesOptions: EChartsOption;

	constructor(
		private analyticsService: AnalyticsService,
		private destroy$: DestroyService,
	    private cdr: ChangeDetectorRef
	) {
		this.categoriesOptions = {};
	}

	ngOnInit() {
		this.analyticsService.getCategoriesStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.categories = Object.entries(res).map(([key, value]) => ({key, value}));
				this.cdr.markForCheck();
				this.categoriesChart();
			});
	}

	categoriesChart() {
		this.categoriesOptions = {
			legend: {
				show: false
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.categories[0].key, this.categories[1].key, this.categories[2].key, this.categories[3].key, this.categories[4].key, this.categories[5].key, this.categories[6].key],
				axisLabel: {
					fontSize: 14,
					color: '#000',
					fontWeight: 'normal'
				}
			},
			// Declare a y-axis (value axis).
			yAxis: {
				type: 'value',
				// max: 500,
			},
			// Declare several 'bar' series,
			// every series will auto-map to each column by default.
			series: [
				{type: 'bar', data: [this.categories[0].value, , , , , ,]},
				{type: 'bar', data: [, this.categories[1].value, , , , ,]},
				{type: 'bar', data: [, , this.categories[2].value, , , ,]},
				{type: 'bar', data: [, , , this.categories[3].value, , ,]},
				{type: 'bar', data: [, , , , this.categories[4].value, ,]},
				{type: 'bar', data: [, , , , , this.categories[5].value,]},
				{type: 'bar', data: [, , , , , , this.categories[6].value]}
			],
		}
	};
}
