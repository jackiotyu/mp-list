<template>
    <view class="container">
        <view v-for="(chunk, pageNum) in list" :key="pageNum" :id="`item${pageNum}`">
            <block v-if="includesList(visibleList, pageNum)">
                <view class="item-list" v-for="item in chunk" :key="item.id">
                    <ListItem :text="item.name"></ListItem>
                </view>
            </block>
            <block v-else>
                <view class="item-visible" :style="'height:' + pageHeightList[pageNum] + 'px'"></view>
            </block>
        </view>
    </view>
</template>

<script>
import { throttle, chunk, binarySearch } from './util';
import { data } from './mock';
export default {
    data() {
        return {
            list: [], // 所有数据
            pageHeightList: [],
            start: 0,
        };
    },
    computed: {
        visibleList() {
            let { start } = this;
            return [start - 1, start, start + 1];
        },
    },
    onLoad() {
        this.index = 0;
        this.currentIndex = 0;
        const chunkData = chunk(data, 5);
        this.pageHeightList = chunkData.map((i) => {
            return i.length * uni.upx2px(200);
        }); // 每屏高度存储
        this.prefixSum = this.pageHeightList.reduce(
            (list, cur, index) => {
                list[index + 1] = cur + list[index];
                return list;
            },
            [0],
        );
        this.list = chunkData;
    },
    // 滚动距离计算
    onPageScroll: throttle(function (e) {
        let pageScrollTop = e[0].scrollTop;
        let index = binarySearch(this.prefixSum, pageScrollTop);
        this.start = index;
    }, 200),
    methods: {
        includesList(list, currentIndex) {
            if (list) {
                return list.indexOf(currentIndex) > -1;
            }
        },
    },
};
</script>

<style lang="scss">
.container {
    width: 100vw;
}
.item-list {
    width: 100vw;
    text-align: center;
    height: 200rpx;
}
</style>
