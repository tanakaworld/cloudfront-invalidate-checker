function CloudFrontInvalidateChecker() {
    this.intervalRange = 5000;
}

CloudFrontInvalidateChecker.prototype.main = function (invalidationId) {
    var target = $('td:contains(' + invalidationId + ')');
    if (target.length >= 1) {
        this.startChecker(target.next().contents());
        console.log('start');
    } else {
        console.log('failed');
        alert('Invalidation ID is invalid!');
    }
};

CloudFrontInvalidateChecker.prototype.startChecker = function (targetDom) {
    var self = this;
    var interval = setInterval(function () {
        if (targetDom.text() === "Completed") {
            clearInterval(interval);
            self.notice();
        } else {
            console.log('progress');
        }
    }, this.intervalRange);

    CloudFrontInvalidateChecker.prototype.notice = function () {
        console.log('complete');
        alert('Purge complete!!!');
    };
};

if (!$) {
    var js = document.createElement('script');
    js.src = '//ajax.googleapis.com/ajax/libs/jquery/2.2.1/jquery.min.js';
    console.log(js);
    document.head.appendChild(js);
}
setTimeout(function () {
    var invalidationId = prompt("Enter Invalidation ID:", "XXXXXXXXXXXXXXX");
    var cf = new CloudFrontInvalidateChecker();
    cf.main(invalidationId);
}, 1000);
