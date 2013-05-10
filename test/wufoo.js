var should = require("should");
var util = require("util");
var Wufoo = require("../lib");
var helper = require("./helper.js");

describe("Wufoo", function() {
   var $wufoo= helper.wufoo;
   describe("#getForms", function() {
      it("Should return forms without error", function(done) {
         $wufoo.getForms(function(err, forms){
            should.not.exist(err);
            should.exist(forms);
            (forms.length > 0).should.be.true;
            done(err);
         });
      });
      
      it("Should return array of objects containing typical wufoo form attributes", function(done) {
         $wufoo.getForms(function(err, forms){
            form = forms[0];
            should.exist(form.hash);
            should.exist(form.language);
            should.exist(form.startDate);
            should.exist(form.endDate);
            should.exist(form.getEntries);
            done(err);
         });
      });
   });


   describe("#getForm", function(){
      it("Should return the right form given the hash", function(done) {
         $wufoo.getForms(function(err, forms){
            var hash = forms[0].hash;
            $wufoo.getForm(hash, function(err, form) {
               form.hash.should.equal(hash);
               done(err);
            });
         });
      })
   });
   
   describe("#getFields", function() {
      var formId;
      
      before(function(done){
         $wufoo.getForms(function(err, forms){
            formId = forms[0].hash;
            done(err);
         })
      });
      
      
      it("Should return an array that's not empty.", function(done){
         $wufoo.getFields(formId, function(err, fields) {
            should.not.exist(err);
            should.exist(fields);
            (fields.length > 0).should.be.true;
            done(err);
         });
      });
      
      it("Should return an array Objects that are Fields.", function(done){
         $wufoo.getFields(formId, function(err, fields) {
            helper.isField(fields[0]);
            done(err);
         });
      });
   });
   
   describe("#getFormEntries", function() {
      var formId;
      before(function(done){
         $wufoo.getForms(function(err, forms){
            formId = forms[0].hash;
            done(err)
         })
         
      })
      
      it("Should return entries without error", function(done) {
         $wufoo.getFormEntries(formId, function(err, entries){
            should.not.exist(err);
            should.exist(entries);
            (entries.length > 0).should.be.true;
            done(err);
         });
      });
      
      it("Should return array of objects containing typical wufoo entry attributes", function(done) {
         $wufoo.getFormEntries(formId, function(err, entries){
            helper.isEntry(entries[0]);
            done(err);
         });
      });
   });
   
   describe("#getReportEntries", function() {
      var reportId;
      before(function(done){
         $wufoo.getReports(function(err, reports){
            reportId = reports[0].hash;
            done(err)
         })
         
      })
      
      it("Should return entries without error", function(done) {
         $wufoo.getReportEntries(reportId, function(err, entries){
            should.not.exist(err);
            should.exist(entries);
            (entries.length > 0).should.be.true;
            done(err);
         });
      });
      
      it("Should return array of objects containing typical wufoo entry attributes", function(done) {
         $wufoo.getReportEntries(reportId, function(err, entries){
            helper.isEntry(entries[0]);
            done(err);
         });
      });
   });
   
   describe("#getReports", function() {
      it("Should return reports without error", function(done) {
         $wufoo.getReports(function(err, reports){
            should.not.exist(err);
            should.exist(reports);
            (reports.length > 0).should.be.true;
            done(err);
         });
      });
      
      it("Should return array of objects containing typical wufoo Report attributes", function(done) {
         $wufoo.getReports(function(err, reports){
            report = reports[0];
            should.exist(report.hash);
            should.exist(report.name);
            should.exist(report.url);
            should.exist(report.dateCreated);
            should.exist(report.dateUpdated);
            should.exist(report.getWidgets);
            done(err);
         });
      });
   });
   
   describe("#getReport", function(){
      it("Should return a Report given the hash", function(done) {
         $wufoo.getReports(function(err, reports){
            var hash = reports[0].hash;
            $wufoo.getReport(hash, function(err, report) {
               report.hash.should.equal(hash);
               done(err);
            });
         });
      })
   });
});
