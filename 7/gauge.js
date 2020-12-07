class GaugeBar {
    constructor (ctxExp, ctxTime) {
        this.ctxExp = ctxExp;
        this.ctxExp.canvas.width = GAUGEBAR_WIDTH;
        this.ctxExp.canvas.height = GAUGEBAR_HEIGHT;
        this.ctxExp.scale(1, 1);
        this.currentExp = 0;

        this.ctxTime = ctxTime;
        this.ctxTime.canvas.width = GAUGEBAR_WIDTH;
        this.ctxTime.canvas.height = GAUGEBAR_HEIGHT;
        this.ctxTime.scale(1, 1);
        this.currentTime = 0;
    }

    setExp(currentValue, maxValue) {
        if (maxValue > 0) {
            this.currentExp = currentValue / maxValue;
        } else {
            this.currentExp = 0;
        }
    }
    
    setTime(currentValue, maxValue) {
        if (maxValue > 0) {
            this.currentTime = currentValue / maxValue;
        } else {
            this.currentTime = 0;
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

    drawTimeBar() {
        this.ctxTime.fillStyle = GAUGEBAR_TIME_BG;
        this.roundedRect(this.ctxTime, 0, 0, GAUGEBAR_WIDTH, GAUGEBAR_HEIGHT, GAUGEBAR_OUTER_RADIUS);
        this.ctxTime.fill();
        this.ctxTime.fillStyle = GAUGEBAR_TIME_COLOR;
        this.roundedRect(this.ctxTime, GAUGEBAR_PADDING, GAUGEBAR_PADDING, 2 * GAUGEBAR_INNER_RADIUS + (GAUGEBAR_WIDTH - 2 * (GAUGEBAR_PADDING + GAUGEBAR_INNER_RADIUS)) * this.currentTime, GAUGEBAR_HEIGHT - 2 * GAUGEBAR_PADDING, GAUGEBAR_INNER_RADIUS);
        this.ctxTime.fill();        
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