export interface ISubscription {
    id?: number;
    user_id?: number;
    plan_id?: number;
    start_date?: string;
    end_date?: string;
    order_id?: string;
    segnature_id?: string;
    payment_id?: string;
    paid_amount?: number;
    coupon_id?: number;
    updatedAt?: string;
    createdAt?: string;
}

export interface ICreateSubscription {
    planId?: number;
    orderId?: string;
    segnatureId?: string;
    paymentId?: string;
    paidAmount?: number;
    couponId?: number;
}