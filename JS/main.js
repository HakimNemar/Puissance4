jQuery(document).ready(function () {
    function checkWin(z, n, tab, player, haut = 0, coté = 0, diagoG = 0, diagoD = 0) {
        if (z < 0 || n < 0) {
            return false;
        }
        if (tab[z][n] == player && haut == 3 ||
            tab[z][n] == player && coté == 3 ||
            tab[z][n] == player && diagoG == 3 ||
            tab[z][n] == player && diagoD == 3) {
            return true;
        }
        if (tab[z][n] != player) {
            return false;
        }
        if (checkWin(z - 1, n, tab, player, haut + 1)) {
            return true;
        }
        if (checkWin(z, n - 1, tab, player, haut = 0, coté + 1)) {
            return true;
        }
        if (checkWin(z - 1, n - 1, tab, player, haut = 0, coté = 0, diagoG + 1)) {
            return true;
        }
        if (checkWin(z - 1, n + 1, tab, player, haut = 0, coté = 0, diagoG = 0, diagoD + 1)) {
            return true;
        }
        return false;
    }

    let myconfirm = confirm("Pour jouer cliqué sur ok");

    let colorJ1 = "red";
    let colorJ2 = "yellow";
    let gridX = $("#gridX").val();
    let gridY = $("#gridY").val();

    if (myconfirm == true) {
        let nameJ1 = prompt("Nom Joueur 1");
        let nameJ2 = prompt("Nom Joueur 2");

        if (nameJ1 == null || nameJ1 == "") {
            nameJ1 = "Joueur 1";
        } if (nameJ2 == null || nameJ2 == "") {
            nameJ2 = "Joueur 2";
        }

        $("#j1").append(nameJ1);
        $("#j2").append(nameJ2);


        $.fn.puissance = function (options) {
            let settings = $.extend({
                play1: colorJ1,
                play2: colorJ2,
                cols: gridX,
                rows: gridY,
            }, options);

            let obj = {
                0: 0,
                1: "play1",
                2: "play2",
            };

            let player = [
                {
                    ref: "playerOne",
                    score: 0
                },
                {
                    ref: "playerTwo",
                    score: 0
                }
            ];

            let tab = [];
            $("#game").append("<table id='table'>");

            for (let i = 0; i < settings.rows; i++) {
                tab[i] = [];
                $("#table").append("<tr id='tr" + i + "'>");
                for (let j = 0; j < settings.cols; j++) {
                    $("#tr" + i).append("<td class='f rows" + i + " cols" + j + "'>");
                    tab[i][j] = obj[0];
                }
            }
            $(".f").append("<p class='obj'>" + obj[0]);

            let a = 0;
            let lastplay;
            $("td").click(function () {
                $(".joue").empty();
                var row = $(this).attr('class').split(' ')[1];
                row = row.split('')[row.length - 1];
                var col = $(this).attr('class').split(' ')[2];
                col = col.split('')[col.length - 1];
                if ($(this)[0]["textContent"] == 0) {
                    let h = settings.rows - 1;
                    if (a == 0) {
                        while (h >= 0 && typeof (tab[h][col]) !== "undefined") {
                            if (tab[h][col] == 0) {
                                for (let i = 0; i < settings.rows; i++) {
                                    if (i < h) {
                                        setTimeout(function () {
                                            $(".rows" + i + ".cols" + col).
                                                css("background", "radial-gradient( " + settings.play1 + ", " + settings.play1 + ", black)");
                                        }, 160);
                                        setTimeout(function () { $(".rows" + i + ".cols" + col).css("background", "rgb(75,75,75)"); }, 200);
                                    }
                                }
                                setTimeout(function () {
                                    $(".rows" + h + ".cols" + col).
                                        css("background", "radial-gradient( " + settings.play1 + ", " + settings.play1 + ", black)");
                                }, 200);

                                $("#currentPlayer").empty();
                                $("#currentPlayer").append("<font color='" + settings.play2 + "'>" + nameJ2 + "</font>");
                                tab[h][col] = 1;
                                lastplay = [h, col, 1];
                                a = 1;

                                let row = tab.length - 1;
                                for (let z = row; z >= 0; z--) {
                                    for (let n = tab[z].length; n >= 0; n--) {
                                        if (checkWin(z, n, tab, 1) == true) {
                                            // setTimeout(function(){
                                            $("#game").addClass("won");
                                            $("#grid").addClass("won");
                                            $("#game").addClass("disabled");
                                            $(".win-display").empty();
                                            $(".win-display").append("Point pour " + nameJ1 + " !");
                                            $("#" + player[0]["ref"]).empty();
                                            player[0]["score"]++;
                                            $("#" + player[0]["ref"]).append(player[0]["score"]);

                                            for (let i = 0; i < settings.rows; i++) {
                                                tab[i] = [];
                                                for (let j = 0; j < settings.cols; j++) {
                                                    tab[i][j] = obj[0];
                                                }
                                            }
                                            $(".f").css("background", "rgb(75, 75, 75)");
                                            // }, 180);
                                        }
                                    }
                                }
                                break;
                            }
                            h--;
                        }
                    }
                    else {
                        while (h >= 0 && typeof (tab[h][col]) !== "undefined") {
                            if (tab[h][col] == 0) {
                                for (let i = 0; i < settings.rows; i++) {
                                    if (i < h) {
                                        setTimeout(function () {
                                            $(".rows" + i + ".cols" + col).
                                                css("background", "radial-gradient( " + settings.play2 + ", " + settings.play2 + ", black)");
                                        }, 150);
                                        setTimeout(function () { $(".rows" + i + ".cols" + col).css("background", "rgb(75,75,75)"); }, 200);
                                    }
                                }
                                setTimeout(function () {
                                    $(".rows" + h + ".cols" + col).
                                        css("background", "radial-gradient( " + settings.play2 + ", " + settings.play2 + ", black)");
                                }, 200);
                                $("#currentPlayer").empty();
                                $("#currentPlayer").append("<font color='" + settings.play1 + "'>" + nameJ1 + "</font>");
                                tab[h][col] = 2;
                                lastplay = [h, col, 2];
                                a = 0;

                                let row = tab.length - 1;
                                for (let z = row; z >= 0; z--) {
                                    for (let n = tab[z].length; n >= 0; n--) {
                                        if (checkWin(z, n, tab, 2) == true) {
                                            // setTimeout(function() {
                                            $("#game").addClass("won");
                                            $("#grid").addClass("won");
                                            $("#game").addClass("disabled");
                                            $(".win-display").empty();
                                            $(".win-display").append("Point pour " + nameJ2 + " !");
                                            $("#" + player[1]["ref"]).empty();
                                            player[1]["score"]++;
                                            $("#" + player[1]["ref"]).append(player[1]["score"]);

                                            for (let i = 0; i < settings.rows; i++) {
                                                tab[i] = [];
                                                for (let j = 0; j < settings.cols; j++) {
                                                    tab[i][j] = obj[0];
                                                }
                                            }
                                            $(".f").css("background", "rgb(75, 75, 75)");
                                            // }, 180);
                                        }
                                    }
                                }
                                break;
                            }
                            h--;
                        }
                    }
                }
                let res = 0;
                for (let i = 0; i < settings.rows; i++) {
                    for (let j = 0; j < settings.cols; j++) {
                        if (tab[i][j] != 0) {
                            res++;
                        }
                        else if (tab[i][j] == 0) {
                            res--;
                        }
                    }
                }
                if (res == (settings.cols * settings.rows)) {
                    $("#game").addClass("won");
                    $("#grid").addClass("won");
                    $(".win-display").empty();
                    $(".win-display").append("Match null !");
                }
            });

            $("#back").click(function () {
                if (lastplay != 0) {
                    $(".rows" + lastplay[0] + ".cols" + lastplay[1]).css("background", "rgb(75,75,75)");
                    tab[lastplay[0]][lastplay[1]] = 0;
                    if (a == 0) {
                        a = 1;
                        $("#currentPlayer").empty();
                        $("#currentPlayer").append("<font color='" + settings.play2 + "'>Rejouer " + nameJ2 + "</font>");
                    }
                    else {
                        $("#currentPlayer").empty();
                        $("#currentPlayer").append("<font color='" + settings.play1 + "'>Rejouer " + nameJ1 + "</font>");
                        a = 0;
                    }
                    lastplay = 0;
                }
                else {
                    $(".joue").empty();
                    $(".mydiv").append("<p class='joue'>Pas d'autres chance</p>");
                }
            });

            $("#replay").click(function () {
                $("#grid").removeClass("won");
                $("#game").removeClass("disabled");
                $("#game").removeClass("won");
                for (let i = 0; i < settings.rows; i++) {
                    tab[i] = [];
                    for (let j = 0; j < settings.cols; j++) {
                        tab[i][j] = obj[0];
                    }
                }
                $(".f").css("background", "rgb(75, 75, 75)");
            });

            $("#color").change(function () {
                if ($("#color").val() != "") {
                    colorJ1 = $("#color").val();
                    settings.play1 = colorJ1;
                }
                for (let i = 0; i < settings.rows; i++) {
                    for (let j = 0; j < settings.cols; j++) {
                        if (tab[i][j] == 1) {
                            $(".rows" + i + ".cols" + j).css("background", "radial-gradient( " + $('#color').val() + ", " + $('#color').val() + ", black)");
                        }
                    }
                }
                $("#currentPlayer").empty();
                $("#currentPlayer").append("<font color='" + settings.play1 + "'>" + nameJ1 + "</font>");
            });

            $("#color2").change(function () {
                if ($("#color2").val() != "") {
                    colorJ2 = $("#color2").val();
                    settings.play2 = colorJ2;
                }
                for (let i = 0; i < settings.rows; i++) {
                    for (let j = 0; j < settings.cols; j++) {
                        if (tab[i][j] == 2) {
                            $(".rows" + i + ".cols" + j).css("background", "radial-gradient( " + $('#color2').val() + ", " + $('#color2').val() + ", black)");
                        }
                    }
                }
                $("#currentPlayer").empty();
                $("#currentPlayer").append("<font color='" + settings.play2 + "'>" + nameJ2 + "</font>");
            });
        };

        $("body").puissance({
            play1: colorJ1,
            play2: colorJ2,
            cols: gridX,
            rows: gridY
        });
    }
    else {
        alert("Désolé mais si tu ne joue pas tu n'a rien à faire ici");
        window.location.replace("pepe.html");
    }
});