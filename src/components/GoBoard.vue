<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Props {
  // 棋盘尺寸
  size: number;
  // 棋盘状态
  boardState: ('b' | 'w' | 'x')[][];
  // 点击回调，参数为点击的坐标 (x, y)
  onClick?: (x: number, y: number) => void;
}

const props = defineProps<Props>();
const canvas = ref<HTMLCanvasElement | null>(null);
const wrapper = ref<HTMLDivElement | null>(null);

// 获取鼠标点击的棋盘坐标
const getGridPosition = (e: MouseEvent) => {
  if (!canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const cssWidth = rect.width;
  const padding = cssWidth * 0.05;
  const cellSize = (cssWidth * 0.9) / (props.size - 1);

  // 计算相对于画布的坐标
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 计算最近的交叉点
  const gridX = Math.round((x - padding) / cellSize);
  const gridY = Math.round((y - padding) / cellSize);

  // 确保坐标在棋盘范围内
  if (gridX >= 0 && gridX < props.size && gridY >= 0 && gridY < props.size) {
    return { x: gridX, y: gridY };
  }
  return null;
};

// 处理画布点击事件
const handleCanvasClick = (e: MouseEvent) => {
  const pos = getGridPosition(e);
  if (pos && props.onClick) {
    props.onClick(pos.x, pos.y);
  }
};

// 绘制棋盘
const drawBoard = (ctx: CanvasRenderingContext2D) => {
  // 使用 CSS 尺寸而不是实际画布尺寸来计算
  const cssWidth = canvas.value?.clientWidth || 0;
  const cellSize = (cssWidth * 0.9) / (props.size - 1); // 90% 的空间用于棋盘
  const padding = cssWidth * 0.05; // 5% 的边距

  // 清空画布
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 设置背景色
  ctx.fillStyle = '#e6d5ac';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 绘制网格线
  ctx.beginPath();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;

  // 绘制横线
  for (let i = 0; i < props.size; i++) {
    ctx.moveTo(padding, padding + i * cellSize);
    ctx.lineTo(cssWidth - padding, padding + i * cellSize);
  }

  // 绘制竖线
  for (let i = 0; i < props.size; i++) {
    ctx.moveTo(padding + i * cellSize, padding);
    ctx.lineTo(padding + i * cellSize, cssWidth - padding);
  }

  ctx.stroke();

  // 绘制棋子
  for (let y = 0; y < props.size; y++) {
    for (let x = 0; x < props.size; x++) {
      const state = props.boardState[x][y];
      if (state === 'x') continue;

      const centerX = padding + x * cellSize;
      const centerY = padding + y * cellSize;
      const radius = cellSize * 0.45; // 棋子大小为格子的90%

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      if (state === 'b') {
        // 黑子
        const gradient = ctx.createRadialGradient(
          centerX - radius * 0.3,
          centerY - radius * 0.3,
          radius * 0.1,
          centerX,
          centerY,
          radius
        );
        gradient.addColorStop(0, '#666');
        gradient.addColorStop(1, '#000');
        ctx.fillStyle = gradient;
      } else {
        // 白子
        const gradient = ctx.createRadialGradient(
          centerX - radius * 0.3,
          centerY - radius * 0.3,
          radius * 0.1,
          centerX,
          centerY,
          radius
        );
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#e0e0e0');
        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
      }

      ctx.fill();
      if (state === 'w') ctx.stroke();
    }
  }
};

// 调整画布大小
const resizeCanvas = () => {
  if (!canvas.value || !wrapper.value) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = wrapper.value.getBoundingClientRect();
  const cssSize = rect.width;

  // 设置画布的 CSS 尺寸
  canvas.value.style.width = `${cssSize}px`;
  canvas.value.style.height = `${cssSize}px`;

  // 设置画布的实际像素尺寸
  canvas.value.width = cssSize * dpr;
  canvas.value.height = cssSize * dpr;

  // 获取上下文并设置缩放
  const ctx = canvas.value.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    // 重要：设置基于 CSS 像素的视口
    ctx.canvas.style.width = `${cssSize}px`;
    ctx.canvas.style.height = `${cssSize}px`;
    drawBoard(ctx);
  }
};

// 监听棋盘状态变化
watch(() => props.boardState, () => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (ctx) drawBoard(ctx);
}, { deep: true });

onMounted(() => {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
});
</script>

<template>
  <div ref="wrapper" class="w-full aspect-square">
    <canvas ref="canvas" @click="handleCanvasClick" class="w-full h-full cursor-pointer" />
  </div>
</template>

<style scoped>

.stone-black {
  background: radial-gradient(circle at 30% 30%, #666 0%, #000 100%);
}

.stone-white {
  background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 100%);
  border: 1px solid #666;
}
</style>
