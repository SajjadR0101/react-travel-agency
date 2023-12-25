const testEmail = email => {
    const emailPattern = /^[a-z0-9/./_]+@[a-z]+\.[a-z]{2,3}$/gi
    return emailPattern.test(email)
}

const testPhone = phone => {
    const phonePattern = /^(\+98|98|0)?9[0-9]{9}$/g
    return phonePattern.test(phone)
}

const testCard = cardNumber => {
    const cardPattern = /^4[0-9]{12}(?:[0-9]{3})?$/g
    return cardPattern.test(cardNumber)
}

const testDate = date => {
    const datePattern = /((Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2},\s+\d{4})|((1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2})/gi
    return datePattern.test(date)
}

const testTime = time => {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( pm|| am)?$/g
    return timePattern.test(time)
}

export { testEmail, testPhone, testCard, testDate, testTime }
