class GaugeBar {
    constructor (ctxExp) {
        this.ctxExp = ctxExp;
        this.ctxExp.canvas.width = GAUGEBAR_WIDTH;
        this.ctxExp.canvas.height = GAUGEBAR_HEIGHT;
        this.ctxExp.scale(1, 1);
        this.currentExp = 0;
    }

    setExp(currentValue, maxValue) {
        if (maxValue > 0) {
            this.currentExp = currentValue / maxValue;
        } else {
            this.currentExp = 0;
        }
    }
    
    drawExpBar() {
        this.ctxExp.fillStyle = GAUGEBAR_EXP_BG;
        this.roundedRect(this.ctxExp, 0, 0, GAUGEBAR_WIDTH, GAUGEBAR_HEIGHT, GAUGEBAR_OUTER_RADIUS);
        this.ctxExp.fill();
        this.ctxExp.fillStyle = GAUGEBAR_EXP_COLOR;
        this.roundedRect(this.ctxExp, GAUGEBAR_PADDING, GAUGEBAR_PADDING, 2 * GAUGEBAR_INNER_RADIUS + (GAUGEBAR_WIDTH - 2 * (GAUGEBAR_PADDING + GAUGEBAR_INNER_RADIUS)) * this.currentExp, GAUGEBAR_HEIGHT - 2 * GAUGEBAR_PADDING, GAUGEBAR_INNER_RADIUS);
        this.ctxExp.fill();
    }

    roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
    }
}