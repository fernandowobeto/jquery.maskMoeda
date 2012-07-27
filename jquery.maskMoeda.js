function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
      };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


jQuery.fn.maskMoeda = function(){
  var o = {padrao:$(this).attr('padrao'),decimais:$(this).attr('decimais')}
  var d = {padrao:'',decimais:2}
  var c = $.extend(d,o);
  var tamanho = 0;
  var $teclas = {8:'backspace',9:'tab',13:'enter',48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9,44:',',37:'setaE',38:'setaC',39:'setaD',40:'setaB',46:'del',35:'end',36:'home'};
  $(this).css('text-align','right').keypress(function(e){
    tamanho = this.value.length;
    var keyCode = e.keyCode?e.keyCode:e.which?e.which:e.charCode;

    if(keyCode == 44 && this.value.indexOf(',') != -1){return false;} // nao deixa mais de uma virgula
    if(keyCode == 44 && !tamanho){return false;} //nao deixa iniciar o campo com virgula

    if(keyCode in $teclas){
      return true;
    }else{
      return false;
    }
  }).change(function(){
    if(!tamanho){
      this.value = c.padrao;
    }else{
      var valor = this.value.replace('.','').replace(',','.');
      var formatado = number_format(valor,c.decimais,',','.');
      this.value = formatado;
    }
  });
  return $(this);
}