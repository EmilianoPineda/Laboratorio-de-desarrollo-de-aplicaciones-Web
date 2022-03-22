exports.homepage = (req, res) => {
    res.render('pages/homepage');
}

exports.about = (req, res) => {
    res.send('About us');
}

exports.ejemplo = (req, res) => {
    res.render('pages/ejemplo');
}